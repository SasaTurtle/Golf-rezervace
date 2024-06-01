using Golf.Models;
using Microsoft.AspNetCore.Authorization;
using Golf.Models;

namespace Golf.Servises
{
    public class Utils
    {
        public UserToken GetUserNameFromContext(System.Security.Claims.ClaimsPrincipal currentUser)
        {
            string userName = String.Empty;
            int userId = 0;
            if (currentUser.Claims.Count() > 0)
            {
                userName = currentUser.Claims.Where(x => x.Type == "username").Select(y => y.Value).ToList()[0];
                userId = int.Parse(currentUser.Claims.Where(x => x.Type == "userid").Select(y => y.Value).ToList()[0]);

            }

            return new UserToken(userId, userName);
        }
    }
}
