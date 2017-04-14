using PersonalityService.Data.Model;

namespace PersonalityService.Features.Hosts
{
    public class HostApiModel
    {        
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public string Name { get; set; }

        public static TModel FromHost<TModel>(Host host) where
            TModel : HostApiModel, new()
        {
            var model = new TModel();
            model.Id = host.Id;
            model.TenantId = host.TenantId;
            model.Name = host.Name;
            return model;
        }

        public static HostApiModel FromHost(Host host)
            => FromHost<HostApiModel>(host);

    }
}
