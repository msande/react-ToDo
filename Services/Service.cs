using System;
using ToDo;

namespace react.Service
{
    public class Service
    {
        private readonly dbContext _context;

        public Service(dbContext context)
        {
            _context = context;
        }

        public void Test()
        {
            //using (var context = new dbContext())
            //{
            /*try
            {
                table1 tb1 = new table1();
                tb1.Name = "yyy";
                _context.table1.Add(tb1);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                object o = ex;
            }*/
            //}
        }
    }
}
 
 