using InterviewTestPagination.Models.DTO;
using PagedList;
using System.Collections.Generic;

namespace InterviewTestPagination.Models {

    /// <summary>
    /// Datasource/Driver layer's main entry-point.
    /// TODO: create appropriate method signatures
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IModelRepository<T> {
        /// <summary>
        /// Example of method signature: lists all entries of type T
        /// </summary>
        /// <returns></returns>
        PagesDTO All(PaginationDTO paginationDTO);
    }
}
