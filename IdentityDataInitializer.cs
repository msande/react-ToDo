using System;
using Microsoft.AspNetCore.Identity;

namespace ToDo
{
    public static class IdentityDataInitializer
    {
        public static void SeedData(
            RoleManager<IdentityRole> roleManager,
            UserManager<IdentityUser> userManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        public static void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("User").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "User";

                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }

            /*if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                IdentityRole role = new IdentityRole();
                role.Name = "Administrator";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }*/
        }

        public static void SeedUsers(UserManager<IdentityUser> userManager)
        {
            if (userManager.FindByNameAsync("matts@stormfrog.com").Result == null)
            {
                IdentityUser user = new IdentityUser();
                user.UserName = "matts@stormfrog.com";
                //user.Email = "matts@stormfrog.com";

                IdentityResult result = userManager.CreateAsync(user, "4i9S97Dx2@LQM9KCwTabrm").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "User").Wait();
                }
            }

            /*if (userManager.FindByNameAsync("admin@stormfrog.com").Result == null)
            {
                IdentityUser user = new IdentityUser();
                user.UserName = "admin@stormfrog.com";
                user.Email = "admin@stormfrog.com";

                IdentityResult result = userManager.CreateAsync(user, "4i9S97Dx2@LQM9KCwTabrm").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user,"Administrator").Wait();
                    userManager.AddToRoleAsync(user, "NormalUser").Wait();
                }
            }*/
        }
    }
}
