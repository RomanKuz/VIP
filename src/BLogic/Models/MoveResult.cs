namespace BLogic.Models
{
    public class MoveResult
    {
        public bool IsSuccessful { get; set; }

        public bool IsCorrect { get; set; }

        public string ErrorMessage { get; set; }

        public string NextMoveUserId { get; set; }

        public bool IsLastMove { get; set; }

        public int SelectedVariantIndex { get; set; }

        public WordBL Word { get; set; }

        public UserInfo User { get; set; }

        public bool IsSkipped { get; set; }

        public GameResult GameResult { get; set; }
    }
}
