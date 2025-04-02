"use client"

import { useState } from "react"
import { Building, MessageSquare, Settings, Bell, Edit, Trash, Plus, Search } from "lucide-react"

// Define the Workspace type
type Workspace = {
  id: string
  name: string
  clients: number
  createdAt: string
  status: "active" | "archived"
}

// Initial workspaces data
const initialWorkspaces: Workspace[] = [
  { id: "1", name: "Workspace X", clients: 3, createdAt: "2023-01-15", status: "active" },
  { id: "2", name: "Workspace Y", clients: 5, createdAt: "2023-02-20", status: "active" },
  { id: "3", name: "Workspace Z", clients: 2, createdAt: "2023-03-10", status: "active" },
  { id: "4", name: "Workspace A", clients: 1, createdAt: "2023-04-05", status: "archived" },
  { id: "5", name: "Workspace B", clients: 4, createdAt: "2023-05-12", status: "active" },
  { id: "6", name: "Workspace C", clients: 6, createdAt: "2023-06-18", status: "active" },
]

export default function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState("")
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  // Filter workspaces based on search query
  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Create a new workspace
  const handleCreateWorkspace = () => {
    if (newWorkspaceName.trim() === "") return

    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: newWorkspaceName,
      clients: 0,
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    }

    setWorkspaces([...workspaces, newWorkspace])
    setNewWorkspaceName("")
    setIsCreateModalOpen(false)
  }

  // Rename a workspace
  const handleRenameWorkspace = () => {
    if (!selectedWorkspace || newWorkspaceName.trim() === "") return

    const updatedWorkspaces = workspaces.map((workspace) =>
      workspace.id === selectedWorkspace.id ? { ...workspace, name: newWorkspaceName } : workspace,
    )

    setWorkspaces(updatedWorkspaces)
    setNewWorkspaceName("")
    setIsRenameModalOpen(false)
    setSelectedWorkspace(null)
  }

  // Delete a workspace
  const handleDeleteWorkspace = () => {
    if (!selectedWorkspace) return

    const updatedWorkspaces = workspaces.filter((workspace) => workspace.id !== selectedWorkspace.id)

    setWorkspaces(updatedWorkspaces)
    setIsDeleteModalOpen(false)
    setSelectedWorkspace(null)
  }

  // Open rename modal
  const openRenameModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace)
    setNewWorkspaceName(workspace.name)
    setIsRenameModalOpen(true)
  }

  // Open delete modal
  const openDeleteModal = (workspace: Workspace) => {
    setSelectedWorkspace(workspace)
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 bg-lura-light flex flex-col border-r border-gray-100">
        <div className="p-4 flex flex-col space-y-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center bg-black text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add a new Workspace
          </button>

          <button className="flex items-center text-gray-700 py-2 px-4 rounded-md hover:bg-white transition-colors">
            <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
            Chat (about Workspace)
          </button>
        </div>

        <div className="mt-auto p-4">
          <button className="flex items-center text-gray-700 py-2 px-4 rounded-md hover:bg-white transition-colors">
            <Settings className="h-5 w-5 mr-2 text-gray-500" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Workspaces</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search workspaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 ${viewMode === "grid" ? "bg-black text-white" : "bg-white text-gray-600"}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 ${viewMode === "table" ? "bg-black text-white" : "bg-white text-gray-600"}`}
              >
                Table
              </button>
            </div>
            <button className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.id}
                workspace={workspace}
                onRename={() => openRenameModal(workspace)}
                onDelete={() => openDeleteModal(workspace)}
              />
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clients
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredWorkspaces.map((workspace) => (
                  <tr key={workspace.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{workspace.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                      {workspace.clients} {workspace.clients === 1 ? "client" : "clients"}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">{workspace.createdAt}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          workspace.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {workspace.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openRenameModal(workspace)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => openDeleteModal(workspace)} className="text-red-600 hover:text-red-900">
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Create Workspace Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New Workspace</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Workspace Name</label>
              <input
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter workspace name"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setNewWorkspaceName("")
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWorkspace}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-opacity-90"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Workspace Modal */}
      {isRenameModalOpen && selectedWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Rename Workspace</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Name</label>
              <input
                type="text"
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter new name"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsRenameModalOpen(false)
                  setNewWorkspaceName("")
                  setSelectedWorkspace(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRenameWorkspace}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-opacity-90"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Workspace Modal */}
      {isDeleteModalOpen && selectedWorkspace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete Workspace</h2>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete "{selectedWorkspace.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false)
                  setSelectedWorkspace(null)
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteWorkspace}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Workspace Card Component
function WorkspaceCard({
  workspace,
  onRename,
  onDelete,
}: {
  workspace: Workspace
  onRename: () => void
  onDelete: () => void
}) {
  return (
    <div className="bg-white shadow-sm rounded-md relative border border-gray-100">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black to-gray-700 rounded-t-md"></div>

      <div className="absolute top-2 right-2 flex space-x-1">
        <button onClick={onRename} className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full">
          <Edit className="h-4 w-4" />
        </button>
        <button onClick={onDelete} className="text-gray-400 hover:text-red-600 p-1 hover:bg-gray-100 rounded-full">
          <Trash className="h-4 w-4" />
        </button>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="mb-4 bg-gray-50 p-3 rounded-full">
          <Building className="h-10 w-10 text-gray-400" />
        </div>

        <h3 className="text-lg font-medium text-lura-primary mb-1">{workspace.name}</h3>
        <p className="text-sm text-lura-secondary">
          {workspace.clients} {workspace.clients === 1 ? "client" : "clients"}
        </p>
        <div className="mt-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              workspace.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {workspace.status}
          </span>
        </div>
      </div>
    </div>
  )
}

