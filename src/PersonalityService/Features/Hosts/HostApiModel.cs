using PersonalityService.Data.Model;
using PersonalityService.Features.Personalities;

namespace PersonalityService.Features.Hosts
{
    public class HostApiModel: PersonalityApiModel
    {
        public string TvShowName { get; set; }

        public string TvShowUrl { get; set; }

        public static TModel FromHost<TModel>(Host host) where
            TModel : HostApiModel, new()
        {
            var model = PersonalityApiModel.FromPersonality(host) as TModel;

            model.TvShowName = host.TvShowName;

            model.TvShowUrl = host.TvShowUrl;

            return model;
        }

        public static HostApiModel FromHost(Host host)
            => FromHost<HostApiModel>(host);

    }
}
