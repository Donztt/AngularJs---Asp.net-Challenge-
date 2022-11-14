using PagedList;
using System;
using System.Collections.Generic;
using InterviewTestPagination.Models.Services;

namespace InterviewTestPagination.Models.DTO {
    public class PagesDTO {
        public int totalPages { get; set; }
        public int totalItems { get; set; }
        public IPagedList<Todo> pages { get; set; }
    }
}
