export class EmailService {
  sendRegistration(name: string, email: string): void {
    const subject = encodeURIComponent('JobSwipe登録情報');
    const body = encodeURIComponent(`名前: ${name}\nメール: ${email}`);
    const mailto = `mailto:k-wada@ielove-group.jp?subject=${subject}&body=${body}`;
    if (typeof window !== 'undefined') {
      window.location.href = mailto;
    }
  }
}
