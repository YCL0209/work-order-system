import { useState } from 'react';
import { Card, Badge, Button, Modal } from '@/components/common';
import { mockAccounts } from '@/mocks';
import { PAGE_DEFINITIONS } from '@/types/account';
import type { Account, PagePermission } from '@/types/account';

export default function AccountManagement() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="space-y-6">
      {/* 頁面標題 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">帳號管理</h1>
        <p className="text-gray-500 mt-1">管理系統帳號與頁面存取權限</p>
      </div>

      {/* 帳號列表 */}
      <Card
        title="帳號列表"
        extra={
          <Button variant="primary" size="sm">
            + 新增帳號
          </Button>
        }
      >
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
      <Card title="頁面權限說明">
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

      {/* 編輯權限 Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`編輯權限 - ${editingAccount?.displayName}`}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
            <Button variant="primary" onClick={handleSave}>
              儲存變更
            </Button>
          </>
        }
      >
        {editingAccount && (
          <div>
            <p className="text-gray-600 mb-4">
              勾選此帳號可以存取的頁面：
            </p>

            <div className="space-y-3">
              {PAGE_DEFINITIONS.filter(p => !p.adminOnly).map(page => {
                const hasPermission = editingAccount.permissions.includes(page.key);
                return (
                  <label
                    key={page.key}
                    className={`
                      flex items-center justify-between p-4 rounded-card border-2 cursor-pointer transition-all
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
                        className="w-5 h-5 rounded"
                      />
                      <div>
                        <div className="font-semibold">{page.name}</div>
                        <div className="text-sm text-gray-500">{page.description}</div>
                      </div>
                    </div>
                    <Badge variant={hasPermission ? 'success' : 'pending'}>
                      {hasPermission ? '已授權' : '未授權'}
                    </Badge>
                  </label>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-card">
              <div className="text-sm text-gray-600">
                <strong>目前已授權 {editingAccount.permissions.filter(p => !PAGE_DEFINITIONS.find(pd => pd.key === p)?.adminOnly).length} 個頁面</strong>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
