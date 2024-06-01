using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static Golf.Models.LoginResonse;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using Golf.Models;

namespace Golf.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly GolfContext _context;

        public LoginController(IConfiguration configuration, GolfContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("login")]
        public ActionResult<object> Authenticate([FromBody] LoginRequest login)
        {
            var loginResponse = new LoginResponse { };
            LoginRequest loginrequest = new()
            {
                UserName = login.UserName.ToLower(),
                Password = login.Password
            };

            bool isUsernamePasswordValid = false;



            int userid = 0; 
            if (login != null)
            {
                var user = _context.User.Where(u => u.email.Equals(login.UserName) && u.password.Equals(login.Password)).FirstOrDefault();
                
                if (user != null)
                {
                    isUsernamePasswordValid = true;
                    userid = user.id;
                }
                else
                {
                    isUsernamePasswordValid = false;
                }
            }
            // if credentials are valid
            if (isUsernamePasswordValid)
            {
                string token = CreateToken(loginrequest.UserName, userid);

                loginResponse.Token = token;
                loginResponse.responseMsg = new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK
                };

                //return the token
                return Ok(new { loginResponse });
            }
            else
            {
                // if username/password are not valid send unauthorized status code in response               
                return BadRequest("Username or Password Invalid!");
            }
        }

        private string CreateToken(string username, int userid)
        {

            List<Claim> claims = new()
            {                    
                //list of Claims - we only checking username - more claims can be added.
                new Claim("username", Convert.ToString(username)),
                new Claim("userid", Convert.ToString(userid)),
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: cred
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
