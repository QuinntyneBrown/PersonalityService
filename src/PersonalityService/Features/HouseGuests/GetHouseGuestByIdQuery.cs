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
    public class GetHouseGuestByIdQuery
    {
        public class GetHouseGuestByIdRequest : IRequest<GetHouseGuestByIdResponse> { 
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class GetHouseGuestByIdResponse
        {
            public HouseGuestApiModel HouseGuest { get; set; } 
        }

        public class GetHouseGuestByIdHandler : IAsyncRequestHandler<GetHouseGuestByIdRequest, GetHouseGuestByIdResponse>
        {
            public GetHouseGuestByIdHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetHouseGuestByIdResponse> Handle(GetHouseGuestByIdRequest request)
            {                
                return new GetHouseGuestByIdResponse()
                {
                    HouseGuest = HouseGuestApiModel.FromHouseGuest(await _context.HouseGuests
                    .Include(x => x.Tenant)				
					.SingleAsync(x=>x.Id == request.Id &&  x.Tenant.UniqueId == request.TenantUniqueId))
                };
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
