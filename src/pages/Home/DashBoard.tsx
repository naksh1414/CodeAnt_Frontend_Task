import React, { useState, useEffect, useMemo, useCallback } from "react";
import { RefreshCw, Plus } from "lucide-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Searchbar from "../../components/Search/Searchbar";
import Modal from "../../components/Modal/Modal";
import logo from "../../assets/Subtract1.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PaginationControls } from "../../components/Pagination";
import { MobileDrawer } from "../../components/Drawer/MobileDrawer";
import RepoCard from "../../components/RepoCard/Card";
import {
  fetchRepositories,
  setPage,
  setItemsPerPage,
} from "../../store/repoSlice";

const RepositoriesDashboard = () => {
  const dispatch = useAppDispatch();
  const {
    filteredRepos: Repos,
    loading,
    error,
    pagination: { currentPage, itemsPerPage, totalItems, hasMore },
  } = useAppSelector((state) => state.repository);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleMobileDrawerOpen = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  const totalPages = useMemo(
    () => Math.ceil(Repos.length / itemsPerPage),
    [Repos.length, itemsPerPage]
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );
  const endIndex = useMemo(
    () => startIndex + itemsPerPage,
    [startIndex, itemsPerPage]
  );

  const currentRepos = useMemo(() => {
    const paginatedRepos = Repos.slice(startIndex, endIndex);
    return paginatedRepos.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [Repos, startIndex, endIndex, searchQuery]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );

  const handleItemsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setItemsPerPage(Number(event.target.value)));
    },
    [dispatch]
  );

  const filteredRepos = currentRepos.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = useCallback(() => {
    dispatch(
      fetchRepositories({
        username: "naksh1414",
        page: currentPage,
        perPage: itemsPerPage,
      })
    );
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    dispatch(
      fetchRepositories({
        username: "naksh1414",
        page: currentPage,
        perPage: itemsPerPage,
      })
    );
  }, [dispatch, currentPage, itemsPerPage]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      <div className="md:hidden flex justify-between gap-2 p-4">
        <div className="flex items-center justify-center gap-2">
          <img src={logo} alt="CodeAnt AI Logo" className="w-8 h-8" />
          <span className="text-xl font-semibold">CodeAnt AI</span>
        </div>
        {!mobileDrawerOpen && (
          <RxHamburgerMenu
            onClick={toggleMobileDrawerOpen}
            className="h-8 w-8"
          />
        )}

        <MobileDrawer
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
        />

        {/* <div className="px-4">
          <div className="menu icon text-black"></div>
        </div> */}
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto max-h-screen ">
        <div className="flex md:flex-row flex-col bg-white border-2 p-4 rounded-xl justify-start md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Repositories</h1>
            <p className="text-gray-600">
              {totalItems} total repositories
            </p>
          </div>
          <div className="flex gap-2 md:mt-0 mt-4">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh All
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Repository
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            ></Modal>
          </div>
        )}

        <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <RepoCard repositories={filteredRepos} isLoading={loading} />

        {/* Pagination Controls */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
};

export default RepositoriesDashboard;
