using MediatR;
using PersonalityService.Data;
using PersonalityService.Data.Model;
using PersonalityService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.HouseGuests
{
    public class AddOrUpdateHouseGuestCommand
    {
        public class AddOrUpdateHouseGuestRequest : IRequest<AddOrUpdateHouseGuestResponse>
        {
            public HouseGuestApiModel HouseGuest { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class AddOrUpdateHouseGuestResponse { }

        public class AddOrUpdateHouseGuestHandler : IAsyncRequestHandler<AddOrUpdateHouseGuestRequest, AddOrUpdateHouseGuestResponse>
        {
            public AddOrUpdateHouseGuestHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<AddOrUpdateHouseGuestResponse> Handle(AddOrUpdateHouseGuestRequest request)
            {
                var entity = await _context.HouseGuests
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.HouseGuest.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.HouseGuests.Add(entity = new HouseGuest() { TenantId = tenant.Id });
                }

                entity.Name = request.HouseGuest.Name;
                
                await _context.SaveChangesAsync();

                return new AddOrUpdateHouseGuestResponse();
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
