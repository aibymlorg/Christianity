import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../auth/store';
import type { ModuleConfig } from '../../config/modules';

interface ModuleFrameProps {
  module: ModuleConfig;
}

export function ModuleFrame({ module }: ModuleFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { token, user } = useAuthStore();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleIframeLoad = () => {
      // Send auth token to iframe when it loads
      if (iframe.contentWindow && token && user) {
        iframe.contentWindow.postMessage(
          {
            type: 'AUTH_TOKEN',
            token,
            user,
          },
          module.url
        );
      }
    };

    iframe.addEventListener('load', handleIframeLoad);

    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
    };
  }, [module.url, token, user]);

  useEffect(() => {
    // Listen for messages from iframe
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the module's origin
      if (event.origin !== new URL(module.url).origin) return;

      if (event.data.type === 'IFRAME_READY') {
        // Iframe is ready, send auth token
        const iframe = iframeRef.current;
        if (iframe?.contentWindow && token && user) {
          iframe.contentWindow.postMessage(
            {
              type: 'AUTH_TOKEN',
              token,
              user,
            },
            module.url
          );
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [module.url, token, user]);

  return (
    <div className="h-screen flex flex-col">
      {/* Module Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{module.icon}</span>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {module.displayName}
              </h2>
              <p className="text-sm text-gray-500">{module.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Iframe */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={module.url}
          className="absolute inset-0 w-full h-full border-0"
          title={module.displayName}
          allow="microphone; camera; geolocation"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
        />
      </div>
    </div>
  );
}
