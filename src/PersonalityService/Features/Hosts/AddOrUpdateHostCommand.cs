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
    public class AddOrUpdateHostCommand
    {
        public class AddOrUpdateHostRequest : IRequest<AddOrUpdateHostResponse>
        {
            public HostApiModel Host { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class AddOrUpdateHostResponse { }

        public class AddOrUpdateHostHandler : IAsyncRequestHandler<AddOrUpdateHostRequest, AddOrUpdateHostResponse>
        {
            public AddOrUpdateHostHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<AddOrUpdateHostResponse> Handle(AddOrUpdateHostRequest request)
            {
                var entity = await _context.Hosts
                    .Include(x => x.Tenant)
                    .SingleOrDefaultAsync(x => x.Id == request.Host.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                
                if (entity == null) {
                    var tenant = await _context.Tenants.SingleAsync(x => x.UniqueId == request.TenantUniqueId);
                    _context.Hosts.Add(entity = new Host() { TenantId = tenant.Id });
                }

                entity.Name = request.Host.Name;
                
                await _context.SaveChangesAsync();

                return new AddOrUpdateHostResponse();
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
