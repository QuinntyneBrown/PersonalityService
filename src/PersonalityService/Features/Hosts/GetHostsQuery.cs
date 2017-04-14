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
    public class GetHostsQuery
    {
        public class GetHostsRequest : IRequest<GetHostsResponse> { 
            public Guid TenantUniqueId { get; set; }       
        }

        public class GetHostsResponse
        {
            public ICollection<HostApiModel> Hosts { get; set; } = new HashSet<HostApiModel>();
        }

        public class GetHostsHandler : IAsyncRequestHandler<GetHostsRequest, GetHostsResponse>
        {
            public GetHostsHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetHostsResponse> Handle(GetHostsRequest request)
            {
                var hosts = await _context.Hosts
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new GetHostsResponse()
                {
                    Hosts = hosts.Select(x => HostApiModel.FromHost(x)).ToList()
                };
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
