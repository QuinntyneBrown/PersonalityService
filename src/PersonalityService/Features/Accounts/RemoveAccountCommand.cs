using MediatR;
using PersonalityService.Data;
using PersonalityService.Data.Model;
using PersonalityService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.Accounts
{
    public class RemoveAccountCommand
    {
        public class RemoveAccountRequest : IRequest<RemoveAccountResponse>
        {
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; } 
        }

        public class RemoveAccountResponse { }

        public class RemoveAccountHandler : IAsyncRequestHandler<RemoveAccountRequest, RemoveAccountResponse>
        {
            public RemoveAccountHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<RemoveAccountResponse> Handle(RemoveAccountRequest request)
            {
                var account = await _context.Accounts.SingleAsync(x=>x.Id == request.Id && x.Tenant.UniqueId == request.TenantUniqueId);
                account.IsDeleted = true;
                await _context.SaveChangesAsync();
                return new RemoveAccountResponse();
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }
    }
}
