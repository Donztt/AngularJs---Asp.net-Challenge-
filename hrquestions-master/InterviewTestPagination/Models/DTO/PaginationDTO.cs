using System;

namespace InterviewTestPagination.Models.DTO {
    public class PaginationDTO {
        public string sortBy { get; set; }
        public int pageNo { get; set; }
        public int pageSize { get; set; }
        public bool descending { get; set; }
    }
}
