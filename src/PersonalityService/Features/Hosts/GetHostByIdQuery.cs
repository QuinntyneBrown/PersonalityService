using MediatR;
using PersonalityService.Data;
using PersonalityService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.Hosts
{
    public class GetHostByIdQuery
    {
        public class GetHostByIdRequest : IRequest<GetHostByIdResponse> { 
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class GetHostByIdResponse
        {
            public HostApiModel Host { get; set; } 
        }

        public class GetHostByIdHandler : IAsyncRequestHandler<GetHostByIdRequest, GetHostByIdResponse>
        {
            public GetHostByIdHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetHostByIdResponse> Handle(GetHostByIdRequest request)
            {                
                return new GetHostByIdResponse()
                {
                    Host = HostApiModel.FromHost(await _context.Hosts
                    .Include(x => x.Tenant)				
					.SingleAsync(x=>x.Id == request.Id &&  x.Tenant.UniqueId == request.TenantUniqueId))
                };
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
