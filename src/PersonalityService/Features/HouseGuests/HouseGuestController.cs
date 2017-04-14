using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PersonalityService.Features.Core;
using static PersonalityService.Features.HouseGuests.AddOrUpdateHouseGuestCommand;
using static PersonalityService.Features.HouseGuests.GetHouseGuestsQuery;
using static PersonalityService.Features.HouseGuests.GetHouseGuestByIdQuery;
using static PersonalityService.Features.HouseGuests.RemoveHouseGuestCommand;

namespace PersonalityService.Features.HouseGuests
{
    [Authorize]
    [RoutePrefix("api/houseGuest")]
    public class HouseGuestController : ApiController
    {
        public HouseGuestController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateHouseGuestResponse))]
        public async Task<IHttpActionResult> Add(AddOrUpdateHouseGuestRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateHouseGuestResponse))]
        public async Task<IHttpActionResult> Update(AddOrUpdateHouseGuestRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetHouseGuestsResponse))]
        public async Task<IHttpActionResult> Get()
        {
            var request = new GetHouseGuestsRequest();
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetHouseGuestByIdResponse))]
        public async Task<IHttpActionResult> GetById([FromUri]GetHouseGuestByIdRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveHouseGuestResponse))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveHouseGuestRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        protected readonly IMediator _mediator;
    }
}
