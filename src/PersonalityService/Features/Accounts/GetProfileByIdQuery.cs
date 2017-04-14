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
    public class GetProfileByIdQuery
    {
        public class GetProfileByIdRequest : IRequest<GetProfileByIdResponse> { 
            public int Id { get; set; }
            public Guid TenantUniqueId { get; set; }
        }

        public class GetProfileByIdResponse
        {
            public ProfileApiModel Profile { get; set; } 
        }

        public class GetProfileByIdHandler : IAsyncRequestHandler<GetProfileByIdRequest, GetProfileByIdResponse>
        {
            public GetProfileByIdHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetProfileByIdResponse> Handle(GetProfileByIdRequest request)
            {                
                return new GetProfileByIdResponse()
                {
                    Profile = ProfileApiModel.FromProfile(await _context.Profiles
                    .Include(x => x.Tenant)				
					.SingleAsync(x=>x.Id == request.Id &&  x.Tenant.UniqueId == request.TenantUniqueId))
                };
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
