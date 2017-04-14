using MediatR;
using PersonalityService.Data;
using PersonalityService.Data.Model;
using PersonalityService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.Personalities
{
    public class RemovePersonalityCommand
    {
        public class RemovePersonalityRequest : IRequest<RemovePersonalityResponse>
        {
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; } 
        }

        public class RemovePersonalityResponse { }

        public class RemovePersonalityHandler : IAsyncRequestHandler<RemovePersonalityRequest, RemovePersonalityResponse>
        {
            public RemovePersonalityHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<RemovePersonalityResponse> Handle(RemovePersonalityRequest request)
            {
                var personality = await _context.Personalities.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                personality.IsDeleted = true;
                await _context.SaveChangesAsync();
                return new RemovePersonalityResponse();
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
