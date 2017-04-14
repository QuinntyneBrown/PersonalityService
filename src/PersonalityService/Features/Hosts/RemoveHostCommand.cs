using MediatR;
using PersonalityService.Data;
using PersonalityService.Data.Model;
using PersonalityService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.Hosts
{
    public class RemoveHostCommand
    {
        public class RemoveHostRequest : IRequest<RemoveHostResponse>
        {
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; } 
        }

        public class RemoveHostResponse { }

        public class RemoveHostHandler : IAsyncRequestHandler<RemoveHostRequest, RemoveHostResponse>
        {
            public RemoveHostHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<RemoveHostResponse> Handle(RemoveHostRequest request)
            {
                var host = await _context.Hosts.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                host.IsDeleted = true;
                await _context.SaveChangesAsync();
                return new RemoveHostResponse();
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
