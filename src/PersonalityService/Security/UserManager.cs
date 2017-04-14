using PersonalityService.Data.Model;
using System.Threading.Tasks;
using System.Security.Principal;
using PersonalityService.Data;
using System.Data.Entity;

namespace PersonalityService.Security
{
    public interface IUserManager
    {
        Task<User> GetUserAsync(IPrincipal user);
    }

    public class UserManager : IUserManager
    {
        public UserManager(IPersonalityServiceContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserAsync(IPrincipal user) => await _context
            .Users
            .Include(x=>x.Tenant)
            .SingleAsync(x => x.Username == user.Identity.Name);

        protected readonly IPersonalityServiceContext _context;
    }
}
