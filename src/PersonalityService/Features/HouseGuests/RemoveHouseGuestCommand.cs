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
    public class RemoveHouseGuestCommand
    {
        public class RemoveHouseGuestRequest : IRequest<RemoveHouseGuestResponse>
        {
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; } 
        }

        public class RemoveHouseGuestResponse { }

        public class RemoveHouseGuestHandler : IAsyncRequestHandler<RemoveHouseGuestRequest, RemoveHouseGuestResponse>
        {
            public RemoveHouseGuestHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<RemoveHouseGuestResponse> Handle(RemoveHouseGuestRequest request)
            {
                var houseGuest = await _context.HouseGuests.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                houseGuest.IsDeleted = true;
                await _context.SaveChangesAsync();
                return new RemoveHouseGuestResponse();
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
