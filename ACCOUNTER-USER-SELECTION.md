# 👥 Accounter User Selection System

Bu sistem, muhasebecilerin (Accounter) birden fazla kullanıcı hesabına erişim sağlamasını ve aralarında geçiş yapmasını sağlar.

## 🚀 Özellikler

- ✅ Muhasebeci kendisine bağlı kullanıcıları dropdown'dan seçebilir
- ✅ Seçim otomatik olarak sunucuya kaydedilir
- ✅ Giriş çıkış sonrası son seçili kullanıcı hatırlanır
- ✅ Real-time olarak tüm API çağrıları seçili kullanıcı bağlamında çalışır
- ✅ Session management ile güvenli erişim

## 📡 Backend API Endpoints

### 1. Erişilebilir Kullanıcıları Getir
```http
GET /api/user-preferences/accessible-users
Authorization: Bearer {token}
```

**Response:**
```json
{
  "isSuccess": true,
  "entity": {
    "accessibleUsers": [
      {
        "userId": 123,
        "firstName": "Ahmet",
        "lastName": "Yılmaz",
        "email": "ahmet@example.com",
        "fullName": "Ahmet Yılmaz",
        "isSelected": true
      }
    ],
    "currentSelectedUserId": 123
  },
  "returnMessage": []
}
```

### 2. Seçili Kullanıcıyı Değiştir
```http
POST /api/user-preferences/set-selected-user
Authorization: Bearer {token}
Content-Type: application/json

{
  "selectedUserId": 456
}
```

### 3. Mevcut Seçili Kullanıcı ID'si
```http
GET /api/user-preferences/selected-user-id
Authorization: Bearer {token}
```

### 4. Session Başlatma (Login sonrası)
```http
POST /api/user-preferences/initialize-selected-user
Authorization: Bearer {token}
```

## 🎨 Frontend Kullanımı

### Component Kullanımı
```html
<!-- Herhangi bir component'te kullanım -->
<app-user-selector></app-user-selector>
```

### Service Kullanımı
```typescript
import { UserPreferenceService } from '../shared/services/user-preference.service';

constructor(private userPreferenceService: UserPreferenceService) {}

// Seçili kullanıcıyı dinle
this.userPreferenceService.selectedUser$.subscribe(selectedUserId => {
  console.log('Seçili kullanıcı ID:', selectedUserId);
  // Bu noktada sayfayı yenile veya state'i güncelle
});

// Manuel kullanıcı değiştir
async changeUser(userId: number) {
  const response = await this.userPreferenceService.setSelectedUser(userId).toPromise();
  if (response?.isSuccess) {
    console.log('Kullanıcı değiştirildi');
  }
}
```

## 🔧 Kurulum Adımları

### 1. Backend Migration
```bash
cd TadesApi/TadesApi.Db
dotnet ef migrations add AddUserPreferences --startup-project ../TadesApi.Portal
dotnet ef database update --startup-project ../TadesApi.Portal
```

### 2. Frontend Build
```bash
cd TadesPortal
npm install
ng build
```

## 🏗️ Mimari

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │   Database      │
│                 │    │                  │    │                 │
│ UserSelector ◄──┼────┼──► UserPref      │    │ UserPreferences │
│ Component       │    │    Controller    │    │ AccounterUsers  │
│                 │    │                  │    │                 │
│ UserPref     ◄──┼────┼──► UserPref      │    │                 │
│ Service         │    │    Service       │    │                 │
│                 │    │                  │    │                 │
│ Session      ◄──┼────┼──► CurrentUser   │    │                 │
│ Management      │    │    + Session     │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔐 Güvenlik

- ✅ Sadece Accounter rolündeki kullanıcılar erişebilir
- ✅ Kullanıcı sadece kendisine atanmış hesaplara erişebilir
- ✅ Session tabanlı yetki kontrolü
- ✅ JWT token ile kimlik doğrulama

## 🔍 Debug

Development ortamında component'te debug bilgileri gösterilir:
- Seçili kullanıcı ID'si
- Erişilebilir kullanıcı sayısı
- Loading durumu

## 🎯 Nasıl Çalışır?

1. **Login:** Accounter giriş yapar
2. **Initialize:** `SecurityFilter` otomatik olarak kullanıcı tercihlerini yükler
3. **Display:** Topbar'da dropdown görünür (sadece Accounter için)
4. **Selection:** Kullanıcı dropdown'dan bir hesap seçer
5. **Persistence:** Seçim database'e kaydedilir
6. **Context:** Sonraki tüm API çağrıları seçili kullanıcı bağlamında çalışır
7. **Remember:** Çıkış yapıp tekrar giriş yaptığında son seçim hatırlanır

## 🚨 Önemli Notlar

- Component sadece `isAccounter = true` olduğunda görünür
- `CurrentUser.SelectedUserId` tüm backend işlemlerinde kullanılabilir
- Session bazlı çalıştığı için sayfa yenilenmesinde kaybolur (bu normal)
- Her login'de `initialize-selected-user` çağrılarak son tercih yüklenir




