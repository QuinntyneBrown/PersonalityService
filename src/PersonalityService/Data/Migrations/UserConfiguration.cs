using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using PersonalityService.Data;
using PersonalityService.Data.Model;
using PersonalityService.Security;

namespace PersonalityService.Migrations
{
    public class UserConfiguration
    {
        public static void Seed(PersonalityServiceContext context) {

            var systemRole = context.Roles.First(x => x.Name == Roles.SYSTEM);
            var roles = new List<Role>();
            var tenant = context.Tenants.Single(x => x.Name == "Default");

            roles.Add(systemRole);

            context.Users.AddOrUpdate(x => x.Username, new User()
            {
                Username = "system",
                Password = new EncryptionService().TransformPassword("system"),
                Roles = roles,
                TenantId = tenant.Id
            });
                        
            context.SaveChanges();
        }
    }
}
