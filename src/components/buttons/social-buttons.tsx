import { Button, ButtonProps } from "../ui/button";

export interface PhoneCallButtonProps extends ButtonProps {
  phone: string;
}
export function PhoneCallButton({ phone, ...props }: PhoneCallButtonProps) {
  return (
    <a href={`tel:${phone}`}>
      <Button {...props} />
    </a>
  );
}

export interface WhatsAppButtonProps extends ButtonProps {
  phone: string;
}
export function WhatsAppButton({ phone, ...props }: WhatsAppButtonProps) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button {...props} />
    </a>
  );
}
