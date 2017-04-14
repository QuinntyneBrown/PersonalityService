using PersonalityService.Data.Helpers;

namespace PersonalityService.Data.Model
{
    [SoftDelete("IsDeleted")]
    public class Host: Personality
    {
        public string TvShowName { get; set; }
        public string TvShowUrl { get; set; }
    }
}
