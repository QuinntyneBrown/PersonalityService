using System.Data.Entity.Migrations;
using PersonalityService.Data;
using PersonalityService.Data.Model;
using PersonalityService.Features.Users;

namespace PersonalityService.Migrations
{
    public class RoleConfiguration
    {
        public static void Seed(PersonalityServiceContext context) {

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.SYSTEM
            });

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.ACCOUNT_HOLDER
            });

            context.Roles.AddOrUpdate(x => x.Name, new Role()
            {
                Name = Roles.DEVELOPMENT
            });

            context.SaveChanges();
        }
    }
}
