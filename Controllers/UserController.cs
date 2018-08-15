using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ToDo.Models;

namespace ToDo.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger<ToDoController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<MyIdentityUser> _userManager;
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly JwtOptions _jwtOptions;
        private readonly SignInManager<MyIdentityUser> _signInManager;

        public UserController(
            ILogger<ToDoController> logger,
            ApplicationDbContext context,
            UserManager<MyIdentityUser> userManager,
            IOptions<IdentityOptions> identityOptions,
            IOptions<JwtOptions> jwtOptions,
            SignInManager<MyIdentityUser> signInManager)
        {
            _logger = logger;
            _context = context;
            _userManager = userManager;
            _identityOptions = identityOptions;
            _jwtOptions = jwtOptions.Value;
            _signInManager = signInManager;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]User userModel)
        {
            // Ensure the username and password is valid.
            var user = await _userManager.FindByNameAsync(userModel.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, userModel.Password))
            {
                return BadRequest(new
                {
                    error = "", //OpenIdConnectConstants.Errors.InvalidGrant,
                    error_description = "The username or password is invalid."
                });
            }

            // Ensure the email is confirmed.
            /*if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                return BadRequest(new
                {
                    error = "email_not_confirmed",
                    error_description = "You must have a confirmed email to log in."
                });
            }*/

            _logger.LogInformation($"User logged in (id: {user.Id})");

            // Generate and issue a JWT token
            var claims = new[] {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              issuer: _jwtOptions.Issuer,
              audience: _jwtOptions.Issuer,
              claims: claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
    }
}
