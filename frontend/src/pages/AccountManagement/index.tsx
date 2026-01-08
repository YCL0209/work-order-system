import { useState } from 'react';
import { Card, Badge, Button, Drawer } from '@/components/common';
import { mockAccounts } from '@/mocks';
import { PAGE_DEFINITIONS } from '@/types/account';
import type { Account, PagePermission } from '@/types/account';

export default function AccountManagement() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newAccount, setNewAccount] = useState({
    username: '',
    displayName: '',
    role: 'assistant' as 'admin' | 'assistant',
    password: '',
    permissions: [] as PagePermission[],
  });

  // 開啟編輯 Modal
  const handleEdit = (account: Account) => {
    setEditingAccount({ ...account });
    setIsModalOpen(true);
  };

  // 切換權限
  const togglePermission = (permission: PagePermission) => {
    if (!editingAccount) return;

    const hasPermission = editingAccount.permissions.includes(permission);
    const newPermissions = hasPermission
      ? editingAccount.permissions.filter(p => p !== permission)
      : [...editingAccount.permissions, permission];

    setEditingAccount({
      ...editingAccount,
      permissions: newPermissions,
    });
  };

  // 儲存變更
  const handleSave = () => {
    if (!editingAccount) return;

    setAccounts(prev =>
      prev.map(acc =>
        acc.id === editingAccount.id ? editingAccount : acc
      )
    );
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  // 切換帳號啟用狀態
  const toggleActive = (accountId: string) => {
    setAccounts(prev =>
      prev.map(acc =>
        acc.id === accountId ? { ...acc, isActive: !acc.isActive } : acc
      )
    );
  };

  // 開啟新增面板
  const handleOpenAdd = () => {
    setNewAccount({
      username: '',
      displayName: '',
      role: 'assistant',
      password: '',
      permissions: [],
    });
    setIsAdding(true);
  };

  // 切換新帳號權限
  const toggleNewPermission = (permission: PagePermission) => {
    const hasPermission = newAccount.permissions.includes(permission);
    const newPermissions = hasPermission
      ? newAccount.permissions.filter(p => p !== permission)
      : [...newAccount.permissions, permission];
    setNewAccount({ ...newAccount, permissions: newPermissions });
  };

  // 新增帳號
  const handleAddAccount = () => {
    if (!newAccount.username || !newAccount.displayName || !newAccount.password) {
      alert('請填寫所有必填欄位');
      return;
    }

    const account: Account = {
      id: `ACC-${Date.now()}`,
      username: newAccount.username,
      displayName: newAccount.displayName,
      role: newAccount.role,
      permissions: newAccount.role === 'admin'
        ? PAGE_DEFINITIONS.map(p => p.key)
        : newAccount.permissions,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    };

    setAccounts(prev => [...prev, account]);
    setIsAdding(false);
  };

  // 渲染新增帳號面板
  const renderAddPanel = () => {
    return (
      <div className="space-y-4">
        {/* 帳號 */}
        <div>
          <label className="form-label">帳號 *</label>
          <input
            type="text"
            className="form-input"
            placeholder="請輸入帳號"
            value={newAccount.username}
            onChange={e => setNewAccount({ ...newAccount, username: e.target.value })}
          />
        </div>

        {/* 顯示名稱 */}
        <div>
          <label className="form-label">顯示名稱 *</label>
          <input
            type="text"
            className="form-input"
            placeholder="請輸入顯示名稱"
            value={newAccount.displayName}
            onChange={e => setNewAccount({ ...newAccount, displayName: e.target.value })}
          />
        </div>

        {/* 密碼 */}
        <div>
          <label className="form-label">密碼 *</label>
          <input
            type="password"
            className="form-input"
            placeholder="請輸入密碼"
            value={newAccount.password}
            onChange={e => setNewAccount({ ...newAccount, password: e.target.value })}
          />
        </div>

        {/* 角色 */}
        <div>
          <label className="form-label">角色</label>
          <select
            className="form-input"
            value={newAccount.role}
            onChange={e => setNewAccount({ ...newAccount, role: e.target.value as 'admin' | 'assistant' })}
          >
            <option value="assistant">助理</option>
            <option value="admin">管理者</option>
          </select>
        </div>

        {/* 頁面權限（僅助理需要設定） */}
        {newAccount.role === 'assistant' && (
          <div>
            <label className="form-label">頁面權限</label>
            <div className="space-y-2 mt-2">
              {PAGE_DEFINITIONS.filter(p => !p.adminOnly).map(page => {
                const hasPermission = newAccount.permissions.includes(page.key);
                return (
                  <label
                    key={page.key}
                    className={`
                      flex items-center justify-between p-3 rounded-card border-2 cursor-pointer transition-all
                      ${hasPermission
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => toggleNewPermission(page.key)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={hasPermission}
                        onChange={() => {}}
                        className="w-4 h-4 rounded"
                      />
                      <div>
                        <div className="font-semibold text-sm">{page.name}</div>
                        <div className="text-xs text-gray-500">{page.description}</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {newAccount.role === 'admin' && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-card">
            <p className="text-sm text-blue-700">管理者擁有所有頁面權限</p>
          </div>
        )}

        <div className="flex gap-3 !mt-6 pt-6 border-t border-gray-200">
          <Button variant="primary" className="flex-[2]" onClick={handleAddAccount}>
            新增帳號
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => setIsAdding(false)}>
            取消
          </Button>
        </div>
      </div>
    );
  };

  // 渲染編輯權限面板
  const renderEditPanel = () => {
    if (!editingAccount) return null;

    return (
      <div className="space-y-4">
        <p className="text-gray-600">
          勾選此帳號可以存取的頁面：
        </p>

        <div className="space-y-3">
          {PAGE_DEFINITIONS.filter(p => !p.adminOnly).map(page => {
            const hasPermission = editingAccount.permissions.includes(page.key);
            return (
              <label
                key={page.key}
                className={`
                  flex items-center justify-between p-3 rounded-card border-2 cursor-pointer transition-all
                  ${hasPermission
                    ? 'border-primary bg-primary-light'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => togglePermission(page.key)}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={hasPermission}
                    onChange={() => {}}
                    className="w-4 h-4 rounded"
                  />
                  <div>
                    <div className="font-semibold text-sm">{page.name}</div>
                    <div className="text-xs text-gray-500">{page.description}</div>
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="p-3 bg-gray-50 rounded-card">
          <div className="text-sm text-gray-600">
            <strong>已授權 {editingAccount.permissions.filter(p => !PAGE_DEFINITIONS.find(pd => pd.key === p)?.adminOnly).length} 個頁面</strong>
          </div>
        </div>

        <div className="flex gap-3 !mt-6 pt-6 border-t border-gray-200">
          <Button variant="primary" className="flex-[2]" onClick={handleSave}>
            儲存變更
          </Button>
          <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>
            取消
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div className="page-header">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">帳號管理</h1>
        </div>
        <Button variant="primary" onClick={handleOpenAdd}>+ 新增帳號</Button>
      </div>

      {/* 帳號列表 */}
      <Card title="帳號列表">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>帳號</th>
                <th>顯示名稱</th>
                <th>角色</th>
                <th>可存取頁面</th>
                <th>狀態</th>
                <th>最後登入</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(account => (
                <tr key={account.id} className={!account.isActive ? 'opacity-50' : ''}>
                  <td className="font-mono">{account.username}</td>
                  <td className="font-semibold">{account.displayName}</td>
                  <td>
                    <Badge variant={account.role === 'admin' ? 'info' : 'pending'}>
                      {account.role === 'admin' ? '管理者' : '助理'}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {account.role === 'admin' ? (
                        <Badge variant="success">全部權限</Badge>
                      ) : account.permissions.length === 0 ? (
                        <span className="text-gray-400">無權限</span>
                      ) : (
                        account.permissions.slice(0, 3).map(p => {
                          const page = PAGE_DEFINITIONS.find(pd => pd.key === p);
                          return (
                            <Badge key={p} variant="active">
                              {page?.name || p}
                            </Badge>
                          );
                        })
                      )}
                      {account.permissions.length > 3 && account.role !== 'admin' && (
                        <Badge variant="pending">+{account.permissions.length - 3}</Badge>
                      )}
                    </div>
                  </td>
                  <td>
                    <Badge variant={account.isActive ? 'success' : 'danger'}>
                      {account.isActive ? '啟用' : '停用'}
                    </Badge>
                  </td>
                  <td className="text-gray-500 text-sm">
                    {account.lastLogin
                      ? new Date(account.lastLogin).toLocaleDateString('zh-TW')
                      : '從未登入'}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="mini"
                        onClick={() => handleEdit(account)}
                        disabled={account.role === 'admin'}
                      >
                        編輯權限
                      </Button>
                      <Button
                        variant={account.isActive ? 'outline-danger' : 'outline-secondary'}
                        size="mini"
                        onClick={() => toggleActive(account.id)}
                        disabled={account.role === 'admin'}
                      >
                        {account.isActive ? '停用' : '啟用'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* 權限說明 */}
        <Card title="頁面權限說明" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            {PAGE_DEFINITIONS.map(page => (
              <div
                key={page.key}
                className={`p-4 rounded-card border ${
                  page.adminOnly ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{page.name}</span>
                  {page.adminOnly && (
                    <Badge variant="info">僅管理者</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">{page.description}</p>
              </div>
            ))}
          </div>
        </Card>

      {/* 新增帳號 Drawer */}
      <Drawer
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        title="新增帳號"
        width="md"
      >
        {renderAddPanel()}
      </Drawer>

      {/* 編輯權限 Drawer */}
      <Drawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAccount ? `編輯權限 - ${editingAccount.displayName}` : '編輯權限'}
        width="md"
      >
        {renderEditPanel()}
      </Drawer>
    </div>
  );
}
