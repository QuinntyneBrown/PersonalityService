using MediatR;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PersonalityService.Features.Core;
using static PersonalityService.Features.Hosts.AddOrUpdateHostCommand;
using static PersonalityService.Features.Hosts.GetHostsQuery;
using static PersonalityService.Features.Hosts.GetHostByIdQuery;
using static PersonalityService.Features.Hosts.RemoveHostCommand;

namespace PersonalityService.Features.Hosts
{
    [Authorize]
    [RoutePrefix("api/host")]
    public class HostController : ApiController
    {
        public HostController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("add")]
        [HttpPost]
        [ResponseType(typeof(AddOrUpdateHostResponse))]
        public async Task<IHttpActionResult> Add(AddOrUpdateHostRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("update")]
        [HttpPut]
        [ResponseType(typeof(AddOrUpdateHostResponse))]
        public async Task<IHttpActionResult> Update(AddOrUpdateHostRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }
        
        [Route("get")]
        [AllowAnonymous]
        [HttpGet]
        [ResponseType(typeof(GetHostsResponse))]
        public async Task<IHttpActionResult> Get()
        {
            var request = new GetHostsRequest();
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("getById")]
        [HttpGet]
        [ResponseType(typeof(GetHostByIdResponse))]
        public async Task<IHttpActionResult> GetById([FromUri]GetHostByIdRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        [Route("remove")]
        [HttpDelete]
        [ResponseType(typeof(RemoveHostResponse))]
        public async Task<IHttpActionResult> Remove([FromUri]RemoveHostRequest request)
        {
            request.TenantUniqueId = Request.GetTenantUniqueId();
            return Ok(await _mediator.Send(request));
        }

        protected readonly IMediator _mediator;
    }
}
