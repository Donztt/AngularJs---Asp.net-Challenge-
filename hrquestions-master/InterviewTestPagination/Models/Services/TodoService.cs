using EntityFrameworkPaginate;
using InterviewTestPagination.Models.DTO;
using PagedList;
using System.Collections.Generic;

namespace InterviewTestPagination.Models.Services {
    /// <summary>
    /// TODO: Implement methods that enable pagination
    /// </summary>
    public class TodoService : IModelService<Todo> {

        private IModelRepository<Todo> _repository = new TodoRepository();

        public IModelRepository<Todo> Repository {
            get { return _repository; }
            set { _repository = value; }
        }

        /// <summary>
        /// Example implementation of List method: lists all entries of type <see cref="Todo"/>
        /// </summary>
        /// <returns></returns>
        public PagesDTO List(PaginationDTO paginationDTO) {
            // invoke Datasource layer
            return Repository.All(paginationDTO);
        }
    }
}
