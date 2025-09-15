
import React, { useState } from 'react';
import { FiSave, FiTrash2, FiEdit, FiPlus, FiChevronDown, FiCheckSquare, FiSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RoleManage = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'admin', permissions: ['product-edit', 'product-list', 'product-delete', 'product-create'] },
    { id: 2, name: 'supplier', permissions: ['product-list', 'product-edit'] },
    { id: 3, name: 'reseller', permissions: ['product-list'] }
  ]);
  
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [permissions, setPermissions] = useState([
    { id: 'role-list', name: 'role-list', checked: false },
    { id: 'role-create', name: 'role-create', checked: false },
    { id: 'role-edit', name: 'role-edit', checked: false },
    { id: 'role-delete', name: 'role-delete', checked: false },
    { id: 'product-list', name: 'product-list', checked: true },
    { id: 'product-create', name: 'product-create', checked: true },
    { id: 'product-edit', name: 'product-edit', checked: true },
    { id: 'product-delete', name: 'product-delete', checked: true },
    // ... more permissions would be added here
  ]);
  const [selectAll, setSelectAll] = useState(false);

  // Handle role selection
  const handleRoleChange = (e) => {
    const role = roles.find(r => r.name === e.target.value);
    if (role) {
      setSelectedRole(role);
      // Update checkboxes based on selected role's permissions
      const updatedPermissions = permissions.map(p => ({
        ...p,
        checked: role.permissions.includes(p.id)
      }));
      setPermissions(updatedPermissions);
      setSelectAll(updatedPermissions.every(p => p.checked));
    }
  };

  // Handle permission checkbox change
  const handlePermissionChange = (id) => {
    const updatedPermissions = permissions.map(p => 
      p.id === id ? { ...p, checked: !p.checked } : p
    );
    setPermissions(updatedPermissions);
    setSelectAll(updatedPermissions.every(p => p.checked));
  };

  // Handle select all permissions
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setPermissions(permissions.map(p => ({ ...p, checked: newSelectAll })));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the role with selected permissions
    const updatedRoles = roles.map(role => 
      role.id === selectedRole.id 
        ? { ...role, permissions: permissions.filter(p => p.checked).map(p => p.id) }
        : role
    );
    setRoles(updatedRoles);
    alert('Role permissions updated successfully!');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Roles Edit</h1>
        <Link to="/admin/users/roles" className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center">
          <FiPlus className="mr-2" /> Manage
        </Link>
      </div>
      
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
              Name *
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 appearance-none"
                id="name"
                name="name"
                value={selectedRole.name}
                onChange={handleRoleChange}
              >
                {roles.map(role => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FiChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                id="check-all"
                name="check-all"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <label className="ml-2 block text-sm font-medium text-purple-600 cursor-pointer" htmlFor="check-all">
                {selectAll ? <FiCheckSquare className="inline mr-1" /> : <FiSquare className="inline mr-1" />}
                Check All
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {permissions.map((permission, index) => (
              <div key={permission.id} className="flex items-center">
                <input
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  id={permission.id}
                  name="permissions[]"
                  type="checkbox"
                  checked={permission.checked}
                  onChange={() => handlePermissionChange(permission.id)}
                />
                <label className="ml-3 block text-sm text-gray-700" htmlFor={permission.id}>
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <button
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition duration-300 flex items-center"
              type="submit"
            >
              <FiSave className="mr-2" /> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleManage;