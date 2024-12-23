import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// GitHub API response interface
interface GitHubRepository {
  id: number;
  name: string;
  private: boolean;
  language: string | null;
  size: number;
  updated_at: string;
  html_url: string;
  description: string | null;
}

interface Repository {
  id: number;
  name: string;
  isPublic: boolean;
  language: string;
  size: string;
  updatedAt: string;
  url: string;
  description: string | null;
}

interface RepositoryState {
  repositories: Repository[];
  filteredRepos: Repository[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

const initialState: RepositoryState = {
  repositories: [],
  filteredRepos: [],
  loading: false,
  error: null,
  searchQuery: "",
  pagination: {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
  },
};

// Utility functions
const formatSize = (sizeInKB: number): string => {
  if (sizeInKB < 1024) return `${sizeInKB} KB`;
  const sizeInMB = (sizeInKB / 1024).toFixed(2);
  return `${sizeInMB} MB`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

// Function to map GitHub repository to our Repository type
const mapGitHubRepository = (repo: GitHubRepository): Repository => ({
  id: repo.id,
  name: repo.name,
  isPublic: !repo.private,
  language: repo.language || "Unknown",
  size: formatSize(repo.size),
  updatedAt: formatDate(repo.updated_at),
  url: repo.html_url,
  description: repo.description,
});

// Async thunk for fetching repositories
export const fetchRepositories = createAsyncThunk(
  "repository/fetchRepositories",
  async (username: string, { rejectWithValue }) => {
    try {
      const token = "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";
      if (!token) {
        throw new Error("GitHub token not found");
      }

      const response = await fetch(
        `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const data = (await response.json()) as GitHubRepository[];
      return data.map(mapGitHubRepository);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch repositories"
      );
    }
  }
);

const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    searchRepositories: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      if (!action.payload) {
        state.filteredRepos = state.repositories;
        return;
      }

      const query = action.payload.toLowerCase();
      state.filteredRepos = state.repositories.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          repo.description?.toLowerCase().includes(query)
      );
      state.pagination.currentPage = 1; // Reset to first page on search
      state.pagination.totalItems = state.filteredRepos.length;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page when changing items per page
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = action.payload;
        state.filteredRepos = action.payload;
        state.pagination.totalItems = action.payload.length;
        state.error = null;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { searchRepositories, setPage, setItemsPerPage, clearError } =
  repositorySlice.actions;
export default repositorySlice.reducer;
