using PersonalityService.Data.Model;

namespace PersonalityService.Features.HouseGuests
{
    public class HouseGuestApiModel
    {        
        public int Id { get; set; }
        public int? TenantId { get; set; }
        public string Name { get; set; }

        public static TModel FromHouseGuest<TModel>(HouseGuest houseGuest) where
            TModel : HouseGuestApiModel, new()
        {
            var model = new TModel();
            model.Id = houseGuest.Id;
            model.TenantId = houseGuest.TenantId;
            model.Name = houseGuest.Name;
            return model;
        }

        public static HouseGuestApiModel FromHouseGuest(HouseGuest houseGuest)
            => FromHouseGuest<HouseGuestApiModel>(houseGuest);

    }
}
