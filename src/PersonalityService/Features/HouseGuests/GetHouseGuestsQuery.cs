using MediatR;
using PersonalityService.Data;
using PersonalityService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.HouseGuests
{
    public class GetHouseGuestsQuery
    {
        public class GetHouseGuestsRequest : IRequest<GetHouseGuestsResponse> { 
            public Guid TenantUniqueId { get; set; }       
        }

        public class GetHouseGuestsResponse
        {
            public ICollection<HouseGuestApiModel> HouseGuests { get; set; } = new HashSet<HouseGuestApiModel>();
        }

        public class GetHouseGuestsHandler : IAsyncRequestHandler<GetHouseGuestsRequest, GetHouseGuestsResponse>
        {
            public GetHouseGuestsHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetHouseGuestsResponse> Handle(GetHouseGuestsRequest request)
            {
                var houseGuests = await _context.HouseGuests
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new GetHouseGuestsResponse()
                {
                    HouseGuests = houseGuests.Select(x => HouseGuestApiModel.FromHouseGuest(x)).ToList()
                };
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
