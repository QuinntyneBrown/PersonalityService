using MediatR;
using PersonalityService.Data;
using PersonalityService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.Accounts
{
    public class GetAccountsQuery
    {
        public class GetAccountsRequest : IRequest<GetAccountsResponse> { 
            public Guid TenantUniqueId { get; set; }       
        }

        public class GetAccountsResponse
        {
            public ICollection<AccountApiModel> Accounts { get; set; } = new HashSet<AccountApiModel>();
        }

        public class GetAccountsHandler : IAsyncRequestHandler<GetAccountsRequest, GetAccountsResponse>
        {
            public GetAccountsHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetAccountsResponse> Handle(GetAccountsRequest request)
            {
                var accounts = await _context.Accounts
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new GetAccountsResponse()
                {
                    Accounts = accounts.Select(x => AccountApiModel.FromAccount(x)).ToList()
                };
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
