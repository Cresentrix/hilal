'use client';

import { useMemo, useState } from 'react';
import { Input } from '@hilal-ds/react';
import {
  Home, Search, Inbox, Bell, User, Users, Settings, LogOut, LogIn, Plus, Minus, X, Check,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Trash, Edit, Copy, Clipboard, Download, Upload, Share, ExternalLink, Link as LinkIcon,
  Heart, Star, Bookmark, Flag, AlertCircle, AlertTriangle, Info, CheckCircle, XCircle,
  Mail, Phone, MessageSquare, Calendar, Clock, MapPin, Globe, Github, Twitter, Linkedin,
  File, FileText, Folder, FolderOpen, Image, Video, Music, Camera, Mic, Volume2, VolumeX, Play, Pause,
  Sun, Moon, Cloud, CloudRain, Zap, Eye, EyeOff, Lock, Unlock, Shield, Key,
  CreditCard, DollarSign, ShoppingCart, ShoppingBag, Package, Truck, Tag,
  Filter, SortAsc, SortDesc, LayoutGrid, List, Columns, Rows, Maximize2, Minimize2, MoreHorizontal, MoreVertical,
  RefreshCw, RotateCcw, RotateCw, Power, Wifi, WifiOff, Battery, Bluetooth,
  BarChart, BarChart2, LineChart, PieChart, TrendingUp, TrendingDown, Activity, Target,
} from '@hilal-ds/icons';

const ICONS = {
  Home, Search, Inbox, Bell, User, Users, Settings, LogOut, LogIn, Plus, Minus, X, Check,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Trash, Edit, Copy, Clipboard, Download, Upload, Share, ExternalLink, Link: LinkIcon,
  Heart, Star, Bookmark, Flag, AlertCircle, AlertTriangle, Info, CheckCircle, XCircle,
  Mail, Phone, MessageSquare, Calendar, Clock, MapPin, Globe, Github, Twitter, Linkedin,
  File, FileText, Folder, FolderOpen, Image, Video, Music, Camera, Mic, Volume2, VolumeX, Play, Pause,
  Sun, Moon, Cloud, CloudRain, Zap, Eye, EyeOff, Lock, Unlock, Shield, Key,
  CreditCard, DollarSign, ShoppingCart, ShoppingBag, Package, Truck, Tag,
  Filter, SortAsc, SortDesc, LayoutGrid, List, Columns, Rows, Maximize2, Minimize2, MoreHorizontal, MoreVertical,
  RefreshCw, RotateCcw, RotateCw, Power, Wifi, WifiOff, Battery, Bluetooth,
  BarChart, BarChart2, LineChart, PieChart, TrendingUp, TrendingDown, Activity, Target,
} as const;

export default function IconographyPage() {
  const [query, setQuery] = useState('');
  const entries = useMemo(() => {
    const q = query.toLowerCase().trim();
    return Object.entries(ICONS)
      .filter(([name]) => !q || name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <h1>Iconography</h1>
      <p className="lede">
        <code>@hilal-ds/icons</code> re-exports the entire Lucide set under one import path.
        Tree-shaking still works — only the icons you import end up in the bundle. Below is a
        curated selection of the most commonly-used names.
      </p>

      <div style={{ maxInlineSize: '24rem', marginBlock: 'var(--hilal-spacing-4)' }}>
        <Input
          placeholder="Filter icons…"
          leadingIcon={<span aria-hidden>⌕</span>}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(8rem, 1fr))',
          gap: 'var(--hilal-spacing-2)',
          marginBlock: 'var(--hilal-spacing-4)',
        }}
      >
        {entries.map(([name, Icon]) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--hilal-spacing-2)',
              padding: 'var(--hilal-spacing-3)',
              border: '1px solid var(--hilal-border-subtle)',
              borderRadius: 'var(--hilal-radius-md)',
              background: 'var(--hilal-bg-page)',
              transition: 'background-color var(--hilal-motion-duration-fast)',
            }}
            title={name}
          >
            <Icon size={20} aria-hidden />
            <span
              style={{
                fontFamily: 'var(--hilal-font-family-mono, ui-monospace, monospace)',
                fontSize: 'var(--hilal-font-size-12)',
                color: 'var(--hilal-fg-tertiary)',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxInlineSize: '100%',
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>

      {entries.length === 0 ? (
        <p style={{ color: 'var(--hilal-fg-tertiary)' }}>No icons match &ldquo;{query}&rdquo;.</p>
      ) : null}

      <h2>Usage</h2>
      <pre className="preview__code"><code>{`import { Search, Home, ChevronDown } from '@hilal-ds/icons';

<Search size={20} aria-hidden />
<Home size={24} strokeWidth={1.5} />`}</code></pre>

      <h2>Full set</h2>
      <p>The full Lucide catalog (1,500+ icons) is available — see <a href="https://lucide.dev" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>lucide.dev</a> for the complete index.</p>
    </>
  );
}
