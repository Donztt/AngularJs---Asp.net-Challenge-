using PagedList;
using System;
using System.Collections.Generic;

namespace InterviewTestPagination.Models.DTO {
    public class TodoDTO {

        public long Id { get; set; }
        public string Task { get; set; }
        public DateTime CreatedDate { get; set; }

        public TodoDTO(long id, string task, DateTime createdDate)
        {
            Id = id;
            Task = task;
            CreatedDate = createdDate;
        }
    }
}
