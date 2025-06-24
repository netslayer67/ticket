import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';

const schema = z.object({
  email: z.string().email('Masukkan email atau nomor yang valid'),
});

const AuthModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setTimeout(() => {
      toast({ title: 'Lanjutkan', description: `Kode dikirim ke ${data.email}`, variant: 'default' });
      setLoading(false);
      onClose();
    }, 1000);
  };

  const simulateSocialLogin = (provider) => {
    toast({
      title: `${provider} Sign-In`,
      description: `Berhasil login dengan ${provider}.`,
      variant: 'success'
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-background w-full max-w-sm mx-auto p-6 rounded-2xl shadow-2xl relative border border-border text-center"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold text-foreground mb-6">Log In/Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-left mb-1 text-muted-foreground">
                  Email/Mobile Number
                </label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Ex:+62812345678 or yourname@email.com"
                  {...register('email')}
                  className="w-full rounded-full py-3 px-4"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1 text-left">{errors.email.message}</p>}
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-3 font-semibold text-lg bg-muted text-muted-foreground"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Continue'}
              </Button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-border" />
              <span className="mx-4 text-muted-foreground text-sm">or log in/register with</span>
              <div className="flex-grow border-t border-border" />
            </div>

            <div className="space-y-3">
              <Button onClick={() => simulateSocialLogin('Google')} variant="outline" className="w-full rounded-full py-2 bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 flex items-center justify-center gap-2">
                <FcGoogle className="w-5 h-5" /> <span>Google</span>
              </Button>
              <Button onClick={() => simulateSocialLogin('Apple')} variant="outline" className="w-full rounded-full py-2 bg-blue-50 text-black border border-border hover:bg-blue-100 flex items-center justify-center gap-2">
                <FaApple className="w-5 h-5" /> <span>Apple</span>
              </Button>
              <Button onClick={() => simulateSocialLogin('Facebook')} variant="outline" className="w-full rounded-full py-2 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 flex items-center justify-center gap-2">
                <FaFacebook className="w-5 h-5" /> <span>Facebook</span>
              </Button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              By continuing, you agree to these <a href="#" className="text-primary hover:underline">Terms & Conditions</a> and acknowledge that you have been informed about our <a href="#" className="text-primary hover:underline">Privacy Notice</a>.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
