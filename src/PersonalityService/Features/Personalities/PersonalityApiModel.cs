using PersonalityService.Data.Model;

namespace PersonalityService.Features.Personalities
{
    public class PersonalityApiModel
    {        
        public int Id { get; set; }

        public int? TenantId { get; set; }

        public string Name { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string ImageUrl { get; set; }

        public string Abstract { get; set; }

        public string Bio { get; set; }


        public static TModel FromPersonality<TModel>(Personality personality) where
            TModel : PersonalityApiModel, new()
        {
            var model = new TModel();

            model.Id = personality.Id;

            model.TenantId = personality.TenantId;

            model.Name = personality.Name;

            model.Firstname = personality.Firstname;

            model.Lastname = personality.Lastname;

            model.Abstract = personality.Abstract;

            model.Bio = personality.Bio;

            model.ImageUrl = personality.ImageUrl;

            return model;
        }

        public static PersonalityApiModel FromPersonality(Personality personality)
            => FromPersonality<PersonalityApiModel>(personality);

    }
}
