namespace Backend.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Slug { get; set; }

        public string Description { get; set; }

        public ICollection<Article> Articles { get; set; }
    }
}