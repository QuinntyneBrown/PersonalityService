using MediatR;
using PersonalityService.Data;
using PersonalityService.Features.Core;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Data.Entity;

namespace PersonalityService.Features.Users
{
    public class GetUserByIdQuery
    {
        public class GetUserByIdRequest : IRequest<GetUserByIdResponse> { 
            public int Id { get; set; }
			public int? TenantId { get; set; }
        }

        public class GetUserByIdResponse
        {
            public UserApiModel User { get; set; } 
        }

        public class GetUserByIdHandler : IAsyncRequestHandler<GetUserByIdRequest, GetUserByIdResponse>
        {
            public GetUserByIdHandler(PersonalityServiceContext context, ICache cache)
            {
                _context = context;
                _cache = cache;
            }

            public async Task<GetUserByIdResponse> Handle(GetUserByIdRequest request)
            {                
                return new GetUserByIdResponse()
                {
                    User = UserApiModel.FromUser(await _context.Users.SingleAsync(x=>x.Id == request.Id && x.TenantId == request.TenantId))
                };
            }

            private readonly PersonalityServiceContext _context;
            private readonly ICache _cache;
        }

    }

}
