import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
import { useAuth } from '../../src/hooks/useAuth';
import { LogOut, Settings, Shield } from 'lucide-react-native';

export default function Profile() {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={[styles.userName, { color: colors.text }]}>{user?.name}</Text>
        <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{user?.email}</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
          <Settings size={20} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
          <Shield size={20} color={colors.text} />
          <Text style={[styles.menuText, { color: colors.text }]}>Privacy & Safety</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.menuItem, { backgroundColor: colors.card }]}
          onPress={logout}
        >
          <LogOut size={20} color="#FF4B4B" />
          <Text style={[styles.menuText, { color: "#FF4B4B" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 64 },
  header: { alignItems: 'center', marginBottom: 40 },
  avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  userName: { fontSize: 24, fontWeight: 'bold' },
  userEmail: { fontSize: 16, marginTop: 4 },
  menu: { gap: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, gap: 12 },
  menuText: { fontSize: 16, fontWeight: '600' },
});
