using EntityFrameworkPaginate;
using InterviewTestPagination.Models.DTO;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using PagedList;
using PagedList.Mvc;

namespace InterviewTestPagination.Models.Services {

    /// <summary>
    /// No need to use an actual persistent datasource. 
    /// All operations can be mocked in-memory as long as they are consistent with the chosen datasource implementation 
    /// (e.g. dont create new model instances when executing a search 'query', etc).
    /// TL;DR: from this point on Database-like operations can be mocked.
    /// </summary>
    public class TodoRepository : IModelRepository<Todo> {

        /// <summary>
        /// Example in-memory model datasource 'indexed' by id.
        /// </summary>
        private static readonly IDictionary<long, Todo> DataSource = new ConcurrentDictionary<long, Todo>();

        static TodoRepository() {
            // initializing datasource
            var startDate = DateTime.Today;
            for (var i = 1; i <= 55; i++) {
                var createdDate = startDate.AddDays(i);
                DataSource[i] = new Todo(id: i, task: "Dont forget to do " + i, createdDate: createdDate);
            }
        }

        public PagesDTO All(PaginationDTO paginationDTO)
        {
            var result = DataSource.Values.OrderByDescending(t => t.CreatedDate);

            if (!paginationDTO.descending)
            {
                switch (paginationDTO.sortBy)
                {
                    case "id":
                        result = DataSource.Values.OrderBy(t => t.Id);
                        break;
                    case "task":
                        result = DataSource.Values.OrderBy(t => t.Task);
                        break;
                    case "createdDate":
                        result = DataSource.Values.OrderBy(t => t.CreatedDate);
                        break;
                    default:
                        result = DataSource.Values.OrderBy(t => t.CreatedDate);
                        break;
                }
            }
            else
            {
                switch (paginationDTO.sortBy)
                {
                    case "id":
                        result = DataSource.Values.OrderByDescending(t => t.Id);
                        break;
                    case "task":
                        result = DataSource.Values.OrderByDescending(t => t.Task);
                        break;
                    case "createdDate":
                        result = DataSource.Values.OrderByDescending(t => t.CreatedDate);
                        break;
                    default:
                        result = DataSource.Values.OrderByDescending(t => t.CreatedDate);
                        break;
                }
            }

            if (paginationDTO.pageNo == 0) {
                paginationDTO.pageNo = 1;
            }
            if (paginationDTO.pageSize == 0)
            {
                paginationDTO.pageSize = result.Count();
            }

               var pagelist = result.ToPagedList(paginationDTO.pageNo, paginationDTO.pageSize);

 
            return new PagesDTO()
            {
                pages = pagelist,
                totalItems = result.Count(),
                totalPages = pagelist.PageCount,
            };
        }
    }
}
