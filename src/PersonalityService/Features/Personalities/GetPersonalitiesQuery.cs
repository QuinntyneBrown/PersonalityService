using MediatR;
using PersonalityService.Data;
using PersonalityService.Features.Core;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.Personalities
{
    public class GetPersonalitiesQuery
    {
        public class GetPersonalitiesRequest : IRequest<GetPersonalitiesResponse> { 
            public Guid TenantUniqueId { get; set; }       
        }

        public class GetPersonalitiesResponse
        {
            public ICollection<PersonalityApiModel> Personalities { get; set; } = new HashSet<PersonalityApiModel>();
        }

        public class GetPersonalitysHandler : IAsyncRequestHandler<GetPersonalitiesRequest, GetPersonalitiesResponse>
        {
            public GetPersonalitysHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetPersonalitiesResponse> Handle(GetPersonalitiesRequest request)
            {
                var personalities = await _context.Personalities
                    .Include(x => x.Tenant)
                    .Where(x => x.Tenant.UniqueId == request.TenantUniqueId )
                    .ToListAsync();

                return new GetPersonalitiesResponse()
                {
                    Personalities = personalities.Select(x => PersonalityApiModel.FromPersonality(x)).ToList()
                };
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
