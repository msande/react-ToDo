using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Models;

namespace ToDo
{
    public static class MyIdentityDataInitializer
    {
        public static void SeedData(UserManager<MyIdentityUser> userManager, RoleManager<MyIdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUsers(userManager);
        }

        public static void SeedUsers(UserManager<MyIdentityUser> userManager)
        {
            if (userManager.FindByNameAsync("user1").Result == null)
            {
                MyIdentityUser user = new MyIdentityUser();
                user.UserName = "user1";
                user.Email = "user1@localhost";
                //user.FullName = "Nancy Davolio";
                //user.BirthDate = new DateTime(1960, 1, 1);

                IdentityResult result = userManager.CreateAsync(user, "4i9S97Dx2@LQM9KCwTabrm").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user,"NormalUser").Wait();
                }
            }


            if (userManager.FindByNameAsync("user2").Result == null)
            {
                MyIdentityUser user = new MyIdentityUser();
                user.UserName = "user2";
                user.Email = "user2@localhost";
                //user.FullName = "Mark Smith";
                //user.BirthDate = new DateTime(1965, 1, 1);

                IdentityResult result = userManager.CreateAsync(user, "4i9S97Dx2@LQM9KCwTabrm").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user,"Administrator").Wait();
                }
            }
        }

        public static void SeedRoles(RoleManager<MyIdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync("NormalUser").Result)
            {
                MyIdentityRole role = new MyIdentityRole();
                role.Name = "NormalUser";
                //role.Description = "Perform normal operations.";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }


            if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                MyIdentityRole role = new MyIdentityRole();
                role.Name = "Administrator";
                //role.Description = "Perform all the operations.";
                IdentityResult roleResult = roleManager.
                CreateAsync(role).Result;
            }
        }
    }
}
