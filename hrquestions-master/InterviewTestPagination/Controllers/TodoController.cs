using System.Collections.Generic;
using System.Web.Http;
using InterviewTestPagination.Models;
using InterviewTestPagination.Models.Services;
using InterviewTestPagination.Models.DTO;
using EntityFrameworkPaginate;
using PagedList;

namespace InterviewTestPagination.Controllers {
    /// <summary>
    /// 'Rest' controller for the <see cref="Todo"/>
    /// model.
    /// 
    /// TODO: implement the pagination Action
    /// </summary>
    public class TodoController : ApiController {

        // TODO: [low priority] setup DI 
        private readonly IModelService<Todo> _todoService = new TodoService();

        [HttpPost]
        public PagesDTO Todos([FromBody] PaginationDTO paginationDTO) {
            return _todoService.Repository.All(paginationDTO);
        }

    }
}
