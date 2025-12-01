# Contributing to LelangMobil

Terima kasih atas minat Anda untuk berkontribusi pada LelangMobil! 🎉

## Code of Conduct

Dengan berpartisipasi dalam proyek ini, Anda diharapkan untuk menjaga lingkungan yang ramah dan profesional.

## Cara Berkontribusi

### Melaporkan Bug

Jika Anda menemukan bug, silakan buat issue dengan informasi berikut:
- Deskripsi bug yang jelas
- Langkah-langkah untuk mereproduksi
- Expected behavior vs actual behavior
- Screenshots (jika applicable)
- Environment (OS, browser, Node version)

### Mengusulkan Fitur Baru

Untuk mengusulkan fitur baru:
1. Buat issue dengan label "feature request"
2. Jelaskan fitur yang diusulkan
3. Jelaskan use case dan manfaatnya
4. Diskusikan dengan maintainer sebelum mulai coding

### Pull Request Process

1. **Fork repository**
   ```bash
   git clone https://github.com/yourusername/lelangmobil.git
   cd lelangmobil
   ```

2. **Buat branch baru**
   ```bash
   git checkout -b feature/amazing-feature
   # atau
   git checkout -b fix/bug-fix
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Buat perubahan**
   - Ikuti coding standards yang ada
   - Tulis kode yang clean dan readable
   - Tambahkan comments jika diperlukan
   - Update dokumentasi jika diperlukan

5. **Test perubahan**
   ```bash
   pnpm dev
   # Test secara manual di browser
   ```

6. **Commit perubahan**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   Gunakan conventional commits:
   - `feat:` untuk fitur baru
   - `fix:` untuk bug fix
   - `docs:` untuk dokumentasi
   - `style:` untuk formatting
   - `refactor:` untuk refactoring
   - `test:` untuk testing
   - `chore:` untuk maintenance

7. **Push ke GitHub**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Buat Pull Request**
   - Buka GitHub dan buat PR
   - Isi deskripsi PR dengan jelas
   - Link ke issue yang terkait
   - Tunggu review dari maintainer

## Coding Standards

### TypeScript
- Gunakan TypeScript untuk semua file
- Define types/interfaces dengan jelas
- Avoid `any` type
- Use strict mode

### React Components
- Gunakan functional components
- Use hooks (useState, useEffect, etc.)
- Extract reusable logic ke custom hooks
- Keep components small and focused

### Naming Conventions
- Components: PascalCase (e.g., `AuctionCard.tsx`)
- Functions: camelCase (e.g., `formatRupiah`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- Files: kebab-case (e.g., `auction-card.tsx`)

### File Structure
```
component-name/
├── index.tsx           # Main component
├── types.ts            # Type definitions
├── hooks.ts            # Custom hooks
└── utils.ts            # Utility functions
```

### Styling
- Gunakan Tailwind CSS classes
- Avoid inline styles
- Use cn() utility untuk conditional classes
- Follow mobile-first approach

### Code Quality
- No console.logs in production code
- Handle errors properly
- Add loading states
- Add error states
- Validate user input
- Sanitize data

## Project Structure

```
lelangmobil/
├── app/                    # Next.js pages
│   ├── (auth)/            # Auth pages
│   ├── admin/             # Admin pages
│   ├── dashboard/         # User dashboard
│   └── lelang/            # Auction pages
├── components/            # React components
│   ├── auction/          # Auction components
│   ├── home/             # Home components
│   ├── ui/               # UI components
│   └── wallet/           # Wallet components
├── lib/                   # Utilities
│   ├── utils/            # Helper functions
│   ├── dummy-data.ts     # Mock data
│   ├── store.ts          # State management
│   └── types.ts          # Type definitions
├── public/               # Static files
└── middleware.ts         # Route protection
```

## Testing

Saat ini proyek belum memiliki automated tests. Kontribusi untuk menambahkan tests sangat diapresiasi!

### Manual Testing Checklist
- [ ] Test di Chrome, Firefox, Safari
- [ ] Test di mobile devices
- [ ] Test semua user flows
- [ ] Test error cases
- [ ] Test loading states
- [ ] Test responsive design

## Documentation

Jika Anda menambahkan fitur baru:
- Update README.md
- Update CHANGELOG.md
- Tambahkan comments di kode
- Update API_DOCUMENTATION.md (jika applicable)

## Questions?

Jika Anda memiliki pertanyaan:
- Buat issue dengan label "question"
- Email: dev@lelangmobil.com
- Discord: [Link to Discord]

## License

Dengan berkontribusi, Anda setuju bahwa kontribusi Anda akan dilisensikan di bawah MIT License.

---

Terima kasih telah berkontribusi! 🙏
