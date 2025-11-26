import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (user: any) => void;
}

export function AuthDialog({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: 1,
        username: loginData.username,
        email: 'user@example.com',
        name: 'Александр Новиков',
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      onAuthSuccess(user);
      
      toast({
        title: 'Вход выполнен!',
        description: `Добро пожаловать, ${loginData.username}!`,
      });
      
      onOpenChange(false);
      setLoginData({ username: '', password: '' });
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: 'Неверный логин или пароль',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: 1,
        username: registerData.username,
        email: registerData.email,
        name: `${registerData.firstName} ${registerData.lastName}`,
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      onAuthSuccess(user);
      
      toast({
        title: 'Регистрация успешна!',
        description: 'Добро пожаловать в нашу школу!',
      });
      
      onOpenChange(false);
      setRegisterData({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast({
        title: 'Ошибка регистрации',
        description: 'Не удалось создать аккаунт. Попробуйте еще раз.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Вход в систему</DialogTitle>
          <DialogDescription className="text-center">
            Войдите или создайте новый аккаунт
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Логин</Label>
                <div className="relative">
                  <Icon name="User" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <Input
                    id="login-username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                    placeholder="Введите логин"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Пароль</Label>
                <div className="relative">
                  <Icon name="Lock" className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Введите пароль"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-purple" disabled={loading}>
                {loading ? 'Вход...' : 'Войти'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={registerData.firstName}
                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                    placeholder="Иван"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={registerData.lastName}
                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                    placeholder="Иванов"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-username">Логин</Label>
                <Input
                  id="register-username"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  placeholder="username"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  placeholder="example@mail.ru"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Пароль</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  placeholder="Минимум 6 символов"
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  placeholder="Повторите пароль"
                  required
                  minLength={6}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-purple" disabled={loading}>
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
