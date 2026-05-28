namespace Backend.DTOs
{
    public class UpdateArticleDTO
    {
        public string Title { get; set; }

        public string Summary { get; set; }

        public string Content { get; set; }

        public string Thumbnail { get; set; }

        public int CategoryId { get; set; }
    }
}